import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../loading";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../store/userStore";
import './index.css';

export const Users = () => {
    const users = useSelector((state: any) => state.userStore.users);
    const dispatch = useDispatch();

    const [hoveredRow, setHoveredRow] = useState<number | null>(null); // Track hovered row

    const categoryList:any={
        software_development:"Software Development",
        human_resources:"Human Resources",
        financial_files:"Financial Files",
        legal_and_compliance:"Legal and Compaliance",
        project_files:"Project Files"
    }

    useEffect(() => {
        dispatch<any>(fetchUsers());
    }, []);

    const isLoading = useSelector((state: any) => state.userStore.loading);

    return (
        <>
            {isLoading && <Loading />}
            <div className="user-table-container mt-4">
                <h4 className="text-center">Users List</h4>
                <table className="table table-hover table-striped table-responsive">
                    <thead className="thead">
                        <tr className="tr">
                            <th>Email</th>
                            <th>Role </th>
                            <th>Categories(Hover to see)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, index: any) => (
                            <tr 
                                key={user._id}
                                onMouseEnter={() => setHoveredRow(index)}  // Set hovered row on mouse enter
                                onMouseLeave={() => setHoveredRow(null)}   // Reset hovered row on mouse leave
                                className={hoveredRow === index ? 'expanded-row' : ''}
                            >
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div className="categories-cell">
                                        {hoveredRow === index ? (
                                            <div className="expanded-categories">
                                                {user.categories.map((category: any, idx: any) => (
                                                    <span key={idx} className="badge badge-info">
                                                        {categoryList[category]||category},
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="assigned-categories">Assigned Categories</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
