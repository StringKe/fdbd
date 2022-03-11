import {
    Avatar,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'

export default function Toolbar() {
    return (
        <Flex
            width={'full'}
            minH={'64px'}
            height={'64px'}
            borderBottomWidth={2}
            alignItems={'center'}
            px={4}
        >
            <Menu>
                <MenuButton as={Button} rightIcon={<FiChevronDown />} mr={2}>
                    文件
                </MenuButton>
                <MenuList>
                    <MenuItem>下载</MenuItem>
                    <MenuItem>另存为</MenuItem>
                    <MenuItem>副本</MenuItem>
                    <MenuItem>删除</MenuItem>
                </MenuList>
            </Menu>

            <Button>保存</Button>

            <HStack mx={'auto !important'}>
                <ButtonGroup isAttached variant='outline'>
                    <Button mr={'-px'}>撤回</Button>
                    <Button>重做</Button>
                </ButtonGroup>
            </HStack>

            <HStack>
                <Menu>
                    <Avatar as={MenuButton} size={'sm'} name={'青木'} />
                    <MenuList>
                        <MenuItem>下载</MenuItem>
                        <MenuItem>另存为</MenuItem>
                        <MenuItem>副本</MenuItem>
                        <MenuItem>删除</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    )
}
