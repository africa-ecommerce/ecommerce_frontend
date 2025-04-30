"use server";

import { Client } from "minio";
import { Buffer } from "buffer";
import { revalidatePath } from "next/cache";

/**
 * Configuration for MinIO client
 */
interface MinioConfig {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  bucketName: string;
  region?: string;
}

// Default configuration - should be overridden by environment variables
const DEFAULT_CONFIG: MinioConfig = {
  endPoint: "play.min.io",
  port: 443,
  useSSL: true,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
  bucketName: "site-generator",
  region: "us-east-1",
};

/**
 * Create MinIO client with configuration from environment or defaults
 */
function createMinioClient(): Client {
  // Use environment variables if available, otherwise use default config
  const config: MinioConfig = {
    endPoint: process.env.MINIO_ENDPOINT || DEFAULT_CONFIG.endPoint,
    port: parseInt(process.env.MINIO_PORT || String(DEFAULT_CONFIG.port)),
    useSSL: process.env.MINIO_USE_SSL === "true" || DEFAULT_CONFIG.useSSL,
    accessKey: process.env.MINIO_ACCESS_KEY || DEFAULT_CONFIG.accessKey,
    secretKey: process.env.MINIO_SECRET_KEY || DEFAULT_CONFIG.secretKey,
    bucketName: process.env.MINIO_BUCKET_NAME || DEFAULT_CONFIG.bucketName,
    region: process.env.MINIO_REGION || DEFAULT_CONFIG.region,
  };

  // Create and return MinIO client
  return new Client({
    endPoint: config.endPoint,
    port: config.port,
    useSSL: config.useSSL,
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    region: config.region,
  });
}

// Get client when needed (no need for lazy initialization in server actions)
function getMinioClient(): Client {
  return createMinioClient();
}

/**
 * Get bucket name from environment or default config
 */
function getBucketName(): string {
  return process.env.MINIO_BUCKET_NAME || DEFAULT_CONFIG.bucketName;
}

/**
 * Determine cache control header based on file type
 * @param filePath - Path to file
 */
function getCacheControl(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase();

  // Cache static assets longer (1 year)
  if (
    [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "svg",
      "ttf",
      "woff",
      "woff2",
      "eot",
      "otf",
    ].includes(ext || "")
  ) {
    return "public, max-age=31536000, immutable";
  }

  // Cache JS and CSS for 1 week, but allow revalidation
  if (["js", "css"].includes(ext || "")) {
    return "public, max-age=604800, stale-while-revalidate=86400";
  }

  // HTML and JSON should be revalidated more frequently
  if (["html", "json"].includes(ext || "")) {
    return "public, max-age=300, must-revalidate";
  }

  // Default cache policy
  return "public, max-age=3600";
}

// /**
//  * Ensure bucket exists, create if it doesn't
//  */
// async function ensureBucketExists(bucketName: string): Promise<void> {
//   const client = getMinioClient();
//   const exists = await client.bucketExists(bucketName);

//   if (!exists) {
//     await client.makeBucket(
//       bucketName,
//       process.env.MINIO_REGION || DEFAULT_CONFIG.region || ""
//     );
//     console.log(`Created bucket: ${bucketName}`);
//   }
// }


/**
 * Ensure bucket exists and has proper CORS configuration
 */
async function ensureBucketWithCors(bucketName: string): Promise<void> {
  const client = getMinioClient();
  const exists = await client.bucketExists(bucketName);

  if (!exists) {
    await client.makeBucket(
      bucketName,
      process.env.MINIO_REGION || DEFAULT_CONFIG.region || ""
    );
    console.log(`Created bucket: ${bucketName}`);
  }

  // Set CORS configuration to allow resource sharing between files
  const corsConfig = {
    CORSRules: [
      {
        AllowedHeaders: ["*"],
        AllowedMethods: ["GET", "PUT", "POST", "DELETE"],
        AllowedOrigins: ["*"],
        ExposeHeaders: ["ETag", "Content-Length", "Content-Type"],
        MaxAgeSeconds: 86400
      }
    ]
  };

  try {
    // await client.setBucketCors(bucketName, corsConfig);
    // console.log(`CORS configuration set for bucket: ${bucketName}`);
  } catch (error) {
    console.error(`Error setting CORS configuration: ${error}`);
  }
}

/**
 * Upload a file to MinIO storage
 * @param key - The object key (path in the bucket)
 * @param body - The file content
 * @param contentType - The content type of the file
 */
export async function uploadToMinio(
  key: string,
  body: string | Buffer,
  contentType: string
) {
  try {
    const client = getMinioClient();
    const bucketName = getBucketName();

    // Ensure bucket exists
    await ensureBucketWithCors(bucketName);

    // Convert string to Buffer if needed
    const buffer = typeof body === "string" ? Buffer.from(body) : body;

    // Upload file with metadata
    const etag = await client.putObject(
      bucketName,
      key,
      buffer,
      buffer.length,
      {
        "Content-Type": contentType,
        "Cache-Control": getCacheControl(key),
      }
    );

    console.log(`Uploaded ${key} to MinIO (${contentType}), ETag: ${etag}`);

    // Optionally revalidate certain paths if needed
    revalidatePath("/");

    return {
      success: true,
      key,
      response: { ETag: etag },
    };
  } catch (error) {
    console.error("Error uploading to MinIO:", error);
    return {
      success: false,
      key,
      error: String(error),
    };
  }
}

/**
 * Check if MinIO connection is working
 */
export async function checkMinioConnection() {
  try {
    const client = getMinioClient();
    const buckets = await client.listBuckets();
    console.log("MinIO connection successful");

    return {
      success: true,
      buckets: buckets.map((b) => ({
        Name: b.name,
        CreationDate: b.creationDate,
      })),
    };
  } catch (error) {
    console.error("MinIO connection failed:", error);
    return {
      success: false,
      error: String(error),
    };
  }
}

/**
 * Get the public URL for a file in MinIO
 * @param key - The object key (path in the bucket)
 */
export async function getMinioPublicUrl(key: string) {
  try {
    const client = getMinioClient();
    const bucketName = getBucketName();

    // Generate a presigned URL that expires in 7 days (or configure as needed)
    const url = await client.presignedGetObject(
      bucketName,
      key,
      7 * 24 * 60 * 60
    );

    console.log(`Generated presigned URL for ${key}: ${url}`);

    
    // Return a proper object with success flag and url
    return {
      success: true,
      url: url
    };
  } catch (error) {
    console.error("Error generating MinIO URL:", error);
    return {
      success: false,
      error: String(error)
    };
  }
}

/**
 * Get a file from MinIO
 * @param key - The object key (path in the bucket)
 */
export async function getFromMinio(key: string) {
  try {
    const client = getMinioClient();
    const bucketName = getBucketName();

    // Get the object
    const dataStream = await client.getObject(bucketName, key);

    // Read the stream
    const chunks: Buffer[] = [];
    for await (const chunk of dataStream) {
      chunks.push(chunk);
    }

    // Combine chunks into one buffer
    const buffer = Buffer.concat(chunks);

    // Get object stat to retrieve content type
    const stat = await client.statObject(bucketName, key);

    return {
      success: true,
      content: buffer.toString(),
      contentType: stat.metaData["content-type"] || "application/octet-stream",
    };
  } catch (error) {
    console.error("Error getting file from MinIO:", error);
    return {
      success: false,
      error: String(error),
    };
  }
}

/**
 * List all files in a MinIO bucket
 * @param prefix - Optional prefix to filter by folder/path
 */
export async function listMinioFiles(prefix: string = "") {
  try {
    const client = getMinioClient();
    const bucketName = getBucketName();

    const objects: any[] = [];
    const stream = client.listObjects(bucketName, prefix, true);

    return new Promise((resolve, reject) => {
      stream.on("data", (obj) => {
        objects.push({
          key: obj.name,
          size: obj.size,
          lastModified: obj.lastModified,
        });
      });

      stream.on("error", (err) => {
        console.error("Error listing MinIO files:", err);
        reject({
          success: false,
          error: String(err),
        });
      });

      stream.on("end", () => {
        resolve({
          success: true,
          files: objects,
        });
      });
    });
  } catch (error) {
    console.error("Error listing MinIO files:", error);
    return {
      success: false,
      error: String(error),
    };
  }
}

/**
 * Delete a file from MinIO
 * @param key - The object key (path in the bucket)
 */
export async function deleteFromMinio(key: string) {
  try {
    const client = getMinioClient();
    const bucketName = getBucketName();

    await client.removeObject(bucketName, key);

    // Optionally revalidate certain paths if needed
    revalidatePath("/");

    return {
      success: true,
      key,
    };
  } catch (error) {
    console.error("Error deleting file from MinIO:", error);
    return {
      success: false,
      key,
      error: String(error),
    };
  }
}
