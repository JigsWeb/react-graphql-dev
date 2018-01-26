import styled from 'styled-components';

export default styled.div`
    ul {
        padding: 0;
        list-style-type: none;

        li {
            border-top: 1px solid black;
            padding: 5px 0px;
            display: flex;
            flex-direction: column;

            .author {
                align-self: flex-end;
            }
        }
    }
`