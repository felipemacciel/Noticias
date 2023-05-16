import  * as React from 'react';
import ReactLoading from 'react-loading';

interface LoadingProps {
    color: string;
    height: number | string;
    width: number | string;
    type?: 'blank' | 'balls' | 'bars' | "bubbles" | 'cubes' | 'cylon' | 'spin' | 'spinningBubbles' | 'spokes'
}

export function Loading(props : LoadingProps): JSX.Element {
    return(
        <>
        <ReactLoading type={props.type ? props.type : 'spin'} color={props.color} height={props.height} width={props.width} />
        </>
    )
}