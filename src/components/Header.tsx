import * as React from 'react';
import { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot'


interface HeaderRootProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface HeaderIconProps {
    children: ReactNode
}

function HeaderRoot(props: HeaderRootProps): JSX.Element {
    return (
        <div {...props} style={{ display: 'flex', fontSize: '18px', fontWeight: '700', alignItems: 'center' }}>
            {props.children}
        </div>
    )
}

function HeaderIcon(props: HeaderIconProps): JSX.Element {
    return (
        <Slot>
            {props.children}
        </Slot>
    )
}


export const Header = {
    Root: HeaderRoot,
    Icon: HeaderIcon
}