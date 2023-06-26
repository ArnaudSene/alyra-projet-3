import { ConnectButton } from '@rainbow-me/rainbowkit';

// export const {WALLET_CONNECT_PROJECT_ID} = process.env

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Voting project 3</h1>
        <ConnectButton />
    </main>
  )
}
