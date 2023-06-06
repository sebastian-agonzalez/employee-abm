'use client';
import { useParams } from "next/navigation";

const EmployeeShow = () => {
    const params = useParams();
    //console.log(useRouter());
    console.log(params);
    return (
        <>
            <p>{params.id}</p>
            <div>employee show</div>
        </>
    );
}

export default EmployeeShow;