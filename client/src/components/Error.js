// popup error message
import {Snippet} from '@nextui-org/react'
const Error = ({error}) => {
    return (
        <div>
            <Snippet color='danger' hideCopyButton hideSymbol>
                {error}
            </Snippet>
        </div>
    )
}
export default Error