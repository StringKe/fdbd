import { useBreakpoint } from '@chakra-ui/react'

export default function useMobile(): boolean {
    const screen = useBreakpoint()
    return ['sm', 'md', 'base'].includes(screen ?? 'base')
}
