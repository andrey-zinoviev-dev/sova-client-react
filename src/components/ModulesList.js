import React from "react";

function ModulesList({selectedCourseModules}) {

    React.useEffect(()=> {
        console.log(selectedCourseModules);
    }, [selectedCourseModules])

    return (
        <ul>

        </ul>
    )
};

export default ModulesList;