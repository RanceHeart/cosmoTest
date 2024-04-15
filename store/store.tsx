import create from 'zustand';
import { Chain, AssetList, Asset } from '@chain-registry/types';
import { assets, chains } from 'chain-registry'; // Assuming these are available and correctly imported
import { defaultChainName } from "@/components/asset/config";

interface StoreState {
    assetList: AssetList;
    selectedChain: string | null;
    addAsset: (newAsset: Asset) => void;
    setSelectedChain: (name: string | null) => void;
}

export const useStore = create<StoreState>((set) => ({
    assetList: assets[8],
    selectedChain: null,
    addAsset: (newAsset) => set((state) => ({
        assetList: {
            ...state.assetList,
            assets: [...state.assetList.assets, newAsset]
        }
    })),
    setSelectedChain: (name) => set(() => ({
        selectedChain: name || null
    })),
}));
