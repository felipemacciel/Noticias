import * as React from 'react';
import { SVGAttributes } from 'react';

interface BookmarkProps extends SVGAttributes<HTMLOrSVGElement> { }

export function Bookmark(props: BookmarkProps): JSX.Element {
    return (
        <svg {...props} viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2917 0.875H2.70835C1.65419 0.875 0.791687 1.7375 0.791687 2.79167V18.125L7.50002 15.25L14.2084 18.125V2.79167C14.2084 1.7375 13.3459 0.875 12.2917 0.875ZM12.2917 15.25L7.50002 13.1608L2.70835 15.25V2.79167H12.2917V15.25Z" fill="#22272F" />
        </svg>

    )
}