import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div id='footer' className={'flex-hori'}>
                <a href='https://github.com/JordanSobovitch' target="_blank" className='github-img-link' >
                    <img src='http://ottis.github.io/inrt/images/octocat.png' alt='github octocat' />
                </a>
            </div>
        );
    }
}