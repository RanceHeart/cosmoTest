import React, { useEffect, useState } from 'react';
import { BasicModal, Box, Button, ChangeChainCombobox, Stack } from '@interchain-ui/react';
import { useStore } from 'store/store';
import { Asset } from '@chain-registry/types';
import { assets } from 'chain-registry';


interface AssetDropdownProps {
    iconUrl: string;
    label: string;
    value: string;
}

export const AddAsset = () => {
    const { addAsset, selectedChain, assetList } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const [selectAsset, setSelectAsset] = useState<{
        iconUrl?: string;
        label: string;
        value: string;
    } | null>(null);
    const [assetsDropDown, setAssetsDropDown] = useState<AssetDropdownProps[]>([]);

    useEffect(() => {
        const assetListForChain = assets.find(al => al.chain_name === selectedChain);
        if (assetListForChain && assetListForChain.assets) {
            const existingAssetNames = new Set(assetList.assets.map(asset => asset.name));
            const formattedAssets = assetListForChain.assets
                .filter(asset => !existingAssetNames.has(asset.name))
                .map(asset => ({
                    iconUrl: asset.logo_URIs?.png || asset.logo_URIs?.jpeg || asset.logo_URIs?.svg || '',
                    label: asset.symbol,
                    value: asset.name,
                }));
            setAssetsDropDown(formattedAssets);
        } else {
            setAssetsDropDown([]);
        }
    }, [assets, selectedChain, assetList.assets]);  // Add assetList.assets to dependencies to update when assets change

    const handleSubmit = () => {
        if (!selectAsset) return;

        const fullAsset = assets.find(assetList => assetList.chain_name === selectedChain)
            ?.assets.find(asset => asset.name === selectAsset.value);

        if (fullAsset && !assetList.assets.some(a => a.name === fullAsset.name)) {
            addAsset(fullAsset);
            // Reset option
            setSelectAsset(null);
            setIsOpen(false);
        }
    };

    return (
        <Box>
            <Button disabled={assetsDropDown.length == 0} onClick={() => setIsOpen(true)}>Add Asset</Button>
            {isOpen && (
                <BasicModal
                    isOpen={isOpen}
                    onClose={() => {
                        setSelectAsset(null);
                        setIsOpen(false)

                    }}
                    title="Add New Asset"
                >
                    <Box height="300px">
                        <Stack
                            direction="horizontal"
                            space="$4"
                            align="center"
                        >
                            <ChangeChainCombobox
                                size="md"
                                valueItem={selectAsset ? selectAsset : undefined}
                                appearance="bold"
                                onItemSelected={(item) => setSelectAsset(item)}
                                options={assetsDropDown}
                            />
                            <Button onClick={handleSubmit} disabled={!selectAsset}>Submit</Button>
                        </Stack>
                    </Box>
                </BasicModal>
            )}
        </Box>
    );
};
