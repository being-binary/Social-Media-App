import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoaderComponenet = () => {
    return (
        <div className='absolute top-0 left-0 w-full h-[110vh]'>
            <Spin
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 48,
                        }}
                        spin
                    />
                }
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height : 'inherit',
                    backgroundColor : 'rgba(122,207,228, 0.2)'
                }}
            />
        </div>
    )
}

export default LoaderComponenet
