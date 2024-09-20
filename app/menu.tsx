"use client";
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Page = ({handleClick}) => {
     const [limit, setLimit] = useState(10)

    return (
        <div>
            <div style={{backgroundColor: 'red'}}>{limit}</div>


            <div onClick={() => {handleClick(20);setLimit(20)}}>20</div>
            <div onClick={() => {handleClick(40);setLimit(40)}}>40</div>
        </div>
    );
};


export default Page;
