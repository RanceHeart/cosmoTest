import React from 'react';
import {Box, useColorModeValue} from '@interchain-ui/react';
import { AssetListView } from './assetListView';
import {SelectChainComBox} from "@/components/asset/selectChainComBox";
export const AssetsManager = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py="$16"
            backgroundColor={useColorModeValue('$backgroundLight', '$backgroundDark')}
        >
            <AssetListView />
            <SelectChainComBox/>
        </Box>
    );
};