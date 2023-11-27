import CartItem from "./CartItem";

const CartList = ({data, onDel, onDelAll,onEdit}) => {
    return (
        <div className="con2">
            <p>
                <button className="btn" onClick={onDelAll} >전체삭제</button>
                <span className="total">
                    총금액 :  { //arr.reduce(초기값[, 현재값])
                        data.reduce((acc, curr) => {
                            return acc += curr.total
                        },0)
                    }
                </span>
            </p>        
            <ul className="list">
               {
                data.map(item => <CartItem key={item.id} item={item} onDel ={onDel} onEdit={onEdit}/>)
               }
            </ul>
        </div>
    );
};

export default CartList;