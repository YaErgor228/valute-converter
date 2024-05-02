import defaultCurrencies from "../constants/Constants"

const Block = (props) => (
    <div className="block">
        <ul className="currencies">
            {defaultCurrencies.map((cur) => {
                return (
                    <li
                        className={props.currency === cur ? 'active' : ''}
                        onClick={() => props.onChangeCurrency(cur)}
                    >{cur}</li>
                )
            })}
            <li>
                <svg height="50px" viewBox="0 0 50 50" width="50px">
                    <rect fill="none" height="50" width="50"/>
                    <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 "/>
                </svg>
            </li>
        </ul>
        <input placeholder={0} value={props.value} onChange={(event) => props.onChangeValue(event.target.value)}/>
    </div>
);
export default Block;