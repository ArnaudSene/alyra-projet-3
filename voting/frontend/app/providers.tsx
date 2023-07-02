'use client';

import * as React from 'react';
import {connectorsForWallets, darkTheme, getDefaultWallets, RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import {argentWallet, ledgerWallet, trustWallet,} from '@rainbow-me/rainbowkit/wallets';
import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {hardhat, sepolia} from 'wagmi/chains';
import {publicProvider} from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react';
import { WorkflowStatusContextProvider } from '@/context/workflowStatus';
import {SelectProposalContextProvider} from "@/context/SelectProposal";

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        sepolia,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [hardhat] : []),
    ],
    [publicProvider()]
);


const projectId: string = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ""

const { wallets } = getDefaultWallets({
    appName: 'RainbowKit demo',
    projectId: projectId,
    chains,
});

const demoAppInfo = {
    appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                chains={chains}
                appInfo={demoAppInfo}
                theme={darkTheme({
                    borderRadius: 'medium',
                })}>
                <ChakraProvider>
                    <WorkflowStatusContextProvider>
                        <SelectProposalContextProvider>
                            {mounted && children}
                        </SelectProposalContextProvider>

                    </WorkflowStatusContextProvider>
                </ChakraProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}