import React, {useState} from 'react';
import {Box, ChangeChainCombobox, Stack} from '@interchain-ui/react';
import {useStore} from 'store/store';
import {chains} from "chain-registry";
import {AddAsset} from "@/components/asset/addAsset";

// Assuming dropdownList mapping remains the same

const dropdownList = chains.slice(0,6).map((chain) => {

    return {
        iconUrl: chain.logo_URIs?.png || chain.logo_URIs?.jpeg || chain.logo_URIs?.svg,
        label: chain.chain_id,
        value: chain.chain_name,
    };
});

export const SelectChainComBox = () => {
    const {setSelectedChain} = useStore();

    const [selectedChainOption, setSelectedChainOption] = useState<{
        iconUrl?: string;
        label: string;
        value: string;
    } | null>(null);

    return (
        <Box display="flex" width={"75%"} alignItems={"flex-center"}>
            <Stack
                direction="horizontal"
                space="$12"
            >
                <ChangeChainCombobox
                    size="md"
                    valueItem={selectedChainOption || undefined}
                    appearance="bold"
                    onItemSelected={(item) => {
                        setSelectedChainOption(item)
                        setSelectedChain(item?.value || '')
                    }}
                    options={dropdownList}
                />
                <AddAsset />
            </Stack>
        </Box>
    );
}