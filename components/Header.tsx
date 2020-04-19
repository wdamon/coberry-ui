import * as React from 'react'
import { Box } from 'grommet';
import Link from 'next/link';

type Props = {}

const StyledHeader: React.FunctionComponent<Props> = (props) => (
    <Box
        key='header'
        tag='header'
        fill={false}
        direction='row'
        align='center'
        justify='start'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: 1 }}
        border={{ color: 'primary', size: 'small' }}
        animation={"fadeIn"}
        gap={"small"}
        {...props}
    />
);

export default function Header() {
    return (
        <StyledHeader>
                <Link href="/">
                    <a>Home</a>
                </Link>{' '}
        </StyledHeader>
    )
}