import { useState } from 'react';
import CartForm from './CartForm';
import CartList from './CartList';
import './style.scss'
import { useRef } from 'react';

const Cart = () => {
    const [data, setData] = useState([])
    //{id: 1, text: '', price : 1000, amount: 2}

    //부모에서 관리 - form 하나 , 값을 받을 공간
    const [cart, setCart] = useState({ 
        text:'', price: '', amount: '',
    })

    //true 수정 false 추가
    const [isEdit, setIsEdit] = useState(false)
    const {text, price, amount} = cart

    //다음번호부터 id 생성
    const no = useRef(1)

    //품목에 포커스
    const textRef = useRef()

    const changeInput = e => {
        const {name, value} = e.target
        setCart({
            ...cart, 
            [ name ] : value
        })
    }
    //추가와 수정
    const onSubmit = e => { 
        e.preventDefault()

        //공백추가방지 cart.text, amount가 1보다 작으면 등록X
        if(!cart.text && cart.amount < 1) return 

        if(isEdit) { //isEdit가 true면 수정 
            cart.total = Number(cart.price * cart.amount)
            //수정하는 값은 cart 자체의 값이므로 cart : item
            setData(data.map(item=>item.id === cart.id ? cart : item))
            setIsEdit(false)
            setCart({ text:'', price: '', amount: '' })
            textRef.current.focus()

        }else { //isEdit가 false면 추가 
            cart.id = no.current++ 
            setData([ ...data,cart ])
            //총합
            cart.total = Number(cart.price * cart.amount)
            //값추가 후 초기화
            setCart({ text:'', price: '', amount: '' })
            textRef.current.focus()
        }
    }
    
    //각각삭제
    const onDel = (id) => {
        setData(data.filter(item => item.id !== id))
    }
    //전체삭제
    const onDelAll = () => {
        setData([])
    }
    //수정
    const onEdit = (id) => {
        //data파일에서 id파일 찾아와서 cart에 넣어주기
        setCart(data.find(item => item.id === id))
        //setCart(data[ id - 1 ])
        setIsEdit(true)
    }

    return (
        <div className="con-box">
            <CartForm changeInput={changeInput} onSubmit={onSubmit} cart={cart} textRef={textRef} isEdit={isEdit}/>
            <CartList data={data} onDel={onDel} onDelAll={onDelAll} onEdit={onEdit}/>
        </div>
    );
};

export default Cart;