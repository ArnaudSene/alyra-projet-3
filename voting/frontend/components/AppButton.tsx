import { Box } from "@chakra-ui/react"

const AppButton = ({ title, description, className, onClick }: { title: string, description: string, className?: string, onClick?: () => void }) => {
    return (<div className={className}>
        <Box className='p-10 text-gray-200 hover:bg-indigo-100 hover:text-gray-700 hover:font-bold'
            as='button'
            borderRadius='xl'
            bgColor='brand.700'
            onClick={onClick}
        >
            <span className="font-bold pr-3 text-indigo-300 underline">
                {title}
            </span>

            <span className="font-semibol">
                {description}
            </span>
        </Box>
    </div>)
}
export default AppButton