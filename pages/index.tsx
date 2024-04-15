import { Divider } from "@interchain-ui/react";
import { Layout, Wallet,AssetsManager } from "@/components";

export default function Home() {
  return (
    <Layout>
      <Wallet />
      <AssetsManager/>
      <Divider mb="$16" />
    </Layout>
  );
}
