// URL parsing utilities for checkout page

export interface ParsedUrlItem {
  pid: string;
  qty: number;
  variation?: string;
}

export interface ParsedCheckoutUrl {
  items: ParsedUrlItem[];
  ref: string | null;
  platform: string | null;
}

export function parseCheckoutUrl(
  searchParams: URLSearchParams
): ParsedCheckoutUrl {
  const platform = searchParams.get("platform");
  const ref = searchParams.get("ref");

  // Check if it's a single product URL
  const singlePid = searchParams.get("pid");
  if (singlePid) {
    const variation = searchParams.get("variation");
    return {
      items: [
        {
          pid: singlePid,
          qty: 1,
          ...(variation && { variation }),
        },
      ],
      ref,
      platform,
    };
  }

  // Parse multiple items from encoded URL
  const items: ParsedUrlItem[] = [];
  let index = 0;

  while (true) {
    const pid = searchParams.get(`item[${index}][pid]`);
    if (!pid) break;

    const qty = Number.parseInt(searchParams.get(`item[${index}][qty]`) || "1");
    const variation = searchParams.get(`item[${index}][variation]`);

    items.push({
      pid,
      qty,
      ...(variation && { variation }),
    });

    index++;
  }

  return {
    items,
    ref,
    platform,
  };
}

 export  const getVariationDisplayName = (variation: any) => {
   

    const parts = []
    if (variation.size) parts.push(variation.size.toUpperCase())
    if (variation.color) parts.push(variation.color.charAt(0).toUpperCase() + variation.color.slice(1))

    return parts.join(" - ") || "Variation"
  }

