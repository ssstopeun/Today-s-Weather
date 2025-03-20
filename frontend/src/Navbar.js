import React from 'react'
import './Navbar.css'
import './css/Button.scss'

const Navbar = () =>{
    return(
        <div>

            <div>
                <div className = 'login-btn'>
                    <div className = 'underline-hover-btn'>로그인</div>
                </div>
            </div>

            <div className ='logo'>
                <img
                    width={200}
                    src='https://i.ibb.co/8n8N2Kr6/2025-03-19-3-20-48.png'
                    alt='로고 이미지 로드 실패'
                    onError={() => console.log('이미지 로딩 실패')}
                />

            </div>


            {/*<div className='menu-area'>*/}
            {/*    <ul className='menu-list'>*/}
            {/*        {menuList.map((menu)=>(<li>{menu}</li>))}*/}
            {/*    </>*/}
            {/*</div>*/}
        </div>
    )
}

export default Navbar