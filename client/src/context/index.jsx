import React, { useContext, createContext } from 'react'

import { useAddress, useMetamask, useContractWrite, useContract } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x2f5BDD59e344e9B3E3d6A8f4473e1A8C36c218aF')
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign')

    const address = useAddress()
    const connect = useMetamask()

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])
            console.log("Contract call success", data)

        } catch (error) {
            console.log("Contract call failure", error)
        }
    }

    return (
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
        }}>
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)