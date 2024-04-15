import {Box, AssetWithdrawTokens, BasicModal} from "@interchain-ui/react";
import { SingleChain, SingleChainProps } from '@interchain-ui/react';
import {useStore} from "@/store/store";
import React, {useMemo, useState} from "react";
export const AssetListView = ()=> {

    const {assetList} = useStore();
    const [isWithDrawOpen, setIsWithDrawOpen] = useState(false);

    const onDepositAsset = () => {
        console.log("Open deposit")
    };

    const onWithdrawAsset = () => {
        console.log("Open withdraw")
        setIsWithDrawOpen(true)
    };

    const assetsToShow = useMemo(() => {
        const returnAssets: SingleChainProps['list'] = assetList.assets.map((asset) => ({
            imgSrc: asset.logo_URIs?.png ?? '',
            symbol: asset.symbol,
            denom: asset.denom_units,
            name: asset.name,
            tokenAmount: '0',
            tokenAmountPrice: '0',
            chainName: assetList.chain_name,
            showDeposit: true,
            showWithdraw: true,
            onDeposit: onDepositAsset,
            onWithdraw: onWithdrawAsset
        }));

        return returnAssets;
    }, [
        assetList.assets
    ]);

    return (
        <Box maxWidth="768px" marginX="auto" marginBottom="60px">
            <SingleChain
                isLoading={false}
                title="Your assets"
                listTitle={`On ${assetList.chain_name}`}
                showDeposit={false}
                showWithdraw={false}
                withdrawButtonLabel={"Add Asset"}
                singleChainHeader={{
                    label: `Total on ${assetList.chain_name}`,
                    value: `${assetList.assets?.length ?? 0}`,
                }}
                list={assetsToShow}
            />
            {isWithDrawOpen && (
                <BasicModal
                    isOpen={isWithDrawOpen}
                    onClose={() => setIsWithDrawOpen(false)}
                    title="Add New Asset"
                >
                    <AssetWithdrawTokens
                        fromSymbol='ATOM'
                        fromName='Cosmos Hub'
                        fromAddress='cosmos1lqsq8hx42l7dzwd7nu8hx42lpkl9zev48trj5k'
                        fromImgSrc='https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png'
                        toName='Osmosis'
                        toAddress='osmo1lqsq8hx42l7dzwd7nu8hx42lpkl9zev48trj5k'
                        toImgSrc='https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg'
                        available={25.89}
                        amount=''
                        priceDisplayAmount={0.5}
                        timeEstimateLabel='20 seconds'
                        onChange={(value) => {
                            console.log('onChange', value);
                        }}
                        onTransfer={() => {
                            console.log('onTransfer');
                        }}
                        onCancel={() => {
                            console.log('onCancel');
                        }}
                        onAddressChange={(value: string) => {
                            console.log('onAddressChange', value);
                        }}
                        onAddressConfirm={() => {
                            console.log('onAddressConfirm');
                        }}
                    />
                </BasicModal>
            )}
        </Box>
    );
};