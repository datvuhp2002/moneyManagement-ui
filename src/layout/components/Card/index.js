import React, { useEffect } from 'react'
import styles from "./card.module.scss"
import classNames from 'classnames/bind'
import { Wrapper } from '../Popper'
const cx = classNames.bind(styles)
const Card = ({data}) => {
  return (
    <div className={cx("wrapper")}>
        <Wrapper >
            <div className='d-flex aligin-items-center w-100 justify-content-center'>
                <h1>Ví tài khoản</h1>
            </div>
            <div  className='d-flex flex-column aligin-items-center w-100 justify-content-center'>
                <h2>{data.name}</h2>
                <div className='d-flex aligin-datas-center justify-content-between '><h1>{data.money}</h1> <h1>{data.currency}</h1></div>
            </div>
        </Wrapper>
    </div>

  )
}

export default Card