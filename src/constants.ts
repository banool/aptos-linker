type Wallet = {
  name: string;
  iconUrl: string;
  /** For now we just always set this to true. Later on we can try do detection. */
  detected: boolean;
  /** Given a URL, return a URL that opens the URL in the in-wallet browser. */
  buildUrl: (url: string) => string;
};

export const wallets: Wallet[] = [
  {
    name: "Petra",
    iconUrl:
      "https://raw.githubusercontent.com/hippospace/aptos-wallet-adapter/main/logos/petra.png",
    detected: true,
    buildUrl: (url: string) =>
      `https://petra.app/explore?link=${encodeURI(url)}`,
  },
  {
    name: "Pontem",
    iconUrl:
      "https://assets-global.website-files.com/60536b901b879c2f395d75d0/65a0fe437d008b178877d8d6_Vector%20(6).svg",
    detected: true,
    buildUrl: (url: string) => `pontem-wallet://browser?link=${encodeURI(url)}`,
  },
];
