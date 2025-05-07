import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { provider } = req.query;
  const callbackUrl = Array.isArray(req.query.callbackUrl)
    ? req.query.callbackUrl[0]
    : req.query.callbackUrl || "/dashboard";

  // build the real backend OAuth URL
  const target = new URL(
    `/auth/${provider}`,
    process.env.NEXT_PUBLIC_BACKEND_URL
  );
  target.searchParams.set("callbackUrl", encodeURIComponent(callbackUrl));

  // 307 preserves method and headers; triggers a redirect
  res.writeHead(307, { Location: target.toString() });
  res.end();
}
