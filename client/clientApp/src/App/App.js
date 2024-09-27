import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';
import MainPanel from '../views/MainPanel';
import LoginPanel from '../views/LoginPanel';
import SocketPanel from '../views/SocketPanel';
import RegisterPanel from '../views/RegisterPanel';

import { auth } from '../views/firebase';
import { useState, useCallback, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import './attachErrorHandler';
import css from './App.module.less';
import './App.style.css';

const App = (props) => {
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const nextPanel = useCallback(() => {
        setIndex((prevIndex) => prevIndex + 1);
    }, []);

    const previousPanel = useCallback(() => {
        setIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }, []);

    const socketPanel = useCallback(() => {
        setIndex(2);
    }, []);

    const mainPanel = useCallback(() => {
        setIndex(1);
    }, []);

    const loginPanel = useCallback(() => {
        setIndex(0);
    }, []);

    const registerPanel = useCallback(() => {
        setIndex(3);
    }, []);

    const chartPanel = useCallback(() => {
        setIndex(4);
    }, []);

    return (
        <Panels css={".custom-panel"} {...props} index={index} onBack={previousPanel}>
            <LoginPanel user={user} setUser={setUser} back={previousPanel} main={mainPanel} register={registerPanel}/>
            <MainPanel login={loginPanel} user={user} next={nextPanel} socket={socketPanel} chart={chartPanel}/>
            <SocketPanel main={mainPanel}/>
            <RegisterPanel login={loginPanel}/>
            <chartPanel />
        </Panels>
    );
};

const AppDecorator = kind({
    styles: {
        css,
        className: 'app'
    },
    render: (props) => <App {...props} />
});

export default ThemeDecorator(AppDecorator);
