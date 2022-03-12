import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, StackProps } from '@chakra-ui/react'
import React from 'react'
import { FiChevronDown } from 'react-icons/fi'

import { useRecoilState } from 'recoil'

import { _onlineCheck } from '../store'
import useMobile from '../utils/useMobile'
import DownloadButton from './DownloadButton'
import LoadFileButton from './LoadFileButton'

export default function FileMenu(props: StackProps) {
    const [isOnline] = useRecoilState(_onlineCheck)
    const isMobile = useMobile()

    if (!isOnline) {
        return (
            <HStack {...props}>
                <LoadFileButton />
                <DownloadButton />
            </HStack>
        )
    }
    return (
        <HStack {...props}>
            <Menu>
                <MenuButton as={Button} rightIcon={<FiChevronDown />} mr={2}>
                    文件
                </MenuButton>
                <MenuList>
                    {isMobile ? <MenuItem>下载</MenuItem> : null}
                    {isMobile ? <MenuItem>从文件加载</MenuItem> : null}
                    <MenuItem>保存</MenuItem>
                    <MenuItem>另存为</MenuItem>
                    <MenuItem>副本</MenuItem>
                    <MenuItem>删除</MenuItem>
                </MenuList>
            </Menu>
            {!isMobile ? <LoadFileButton /> : null}
            {!isMobile ? <DownloadButton /> : null}
        </HStack>
    )
}
