import React from 'react'

const Loader = () => {
  return (
        <div className='bg-[#0047FF] h-screen w-screen flex justify-center items-center'>

            <div
                className='loader-text'
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #ffffff",
                    padding: "6px 14px",
                    lineHeight: 1,
                }}
            >
                <span
                    style={{
                        fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
                        fontWeight: 900,
                        fontStyle: "normal",
                        fontSize: "22px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#ffffff",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                    }}
                >
                    APECHAIN
                </span>
            </div>
        </div>
    )
}

export default Loader