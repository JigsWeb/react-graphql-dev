import styled from 'styled-components';

export default styled.div`

    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        list-style-type: none;

        li {
            cursor: pointer;
            color: white;
            font-weight: bold;
            letter-spacing: 1px;
            text-align: center;
            background-color: grey;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            width: 30%;
            padding: 15px 10px;
            margin: 10px 0px;
            transition: transform 0.5s ease;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
    
`