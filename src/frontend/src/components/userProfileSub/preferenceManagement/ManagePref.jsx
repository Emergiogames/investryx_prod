import React, { useEffect, useState } from "react";
import { getPreference } from "../../../services/user/apiMethods";
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

function ManagePref() {
    const [pref, setPref] = useState(null); // Use null initially to check if data exists
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        getPreference()
            .then((response) => {
                if (response.status === 200) {
                    setPref(response.data);
                }
            })
            .catch((error) => {
                console.error("Error occurred", error);
            });
    }, []);

    const TABLE_ROWS = pref
        ? [
              { key: "Profile", value: pref.profile || "N/A" },
              { key: "Interested City", value: pref.interested_city || "N/A" },
              { key: "Interested State", value: pref.interested_state || "N/A" },
              { key: "Investment Interest", value: pref.investment_interest || "N/A" },
              { key: "Investment Horizon", value: pref.investment_horizon || "N/A" },
              { key: "Frequency", value: pref.frequency || "N/A" },
          ]
        : [];

    return (
        <div className="bg-amber-100 rounded-lg mx-6">
            <div className="p-7">
                <div className="mb-5 text-3xl font-medium font-sans text-violet-900 flex justify-center">Preferences</div>

                <div>
                    <Card className="h-full w-full px-6 bg-amber-50">
                        <table className="w-full min-w-max table-auto text-left ">
                            <tbody>
                                {TABLE_ROWS.length > 0 ? (
                                    TABLE_ROWS.map(({ key, value }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                                        return (
                                            <tr key={key} className="hover:bg-gray-50">
                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {key}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="small" className="font-normal text-gray-600">
                                                        {value}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td className="text-center py-4">No preferences available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>

                {/* Manage Preferences Button */}
                <div className="flex flex-col items-center text-center mt-4">
                    <button
                        // onClick={() => setIsPopupOpen(true)}
                        className="p-4 m-4 w-full px-3 bg-yellow-300 hover:bg-yellow-400 mb-6 md:min-w-64 rounded-lg shadow-md"
                    >
                        Manage Preferences
                    </button>
                    <div className="text-gray-600">*Update your preferences for better experience!</div>
                </div>

                {/* Popup Modal */}
                {isPopupOpen && <PreferencePopUp pref={pref} setPref={setPref} onClose={() => setIsPopupOpen(false)} />}
            </div>
        </div>
    );
}

export default ManagePref;

//POPUP Part

const TABLE_HEAD = ["Parameters", "Preferences", ""];


export const PreferencePopUp = ({pref}) => {
   
    console.log('final pref data 111:', pref);

    AllPrefData = pref ?  [
        { key: "Profile", value: pref.profile || "N/A" },
        { key: "Interested City", value: pref.interested_city || "N/A" },
        { key: "Interested State", value: pref.interested_state || "N/A" },
        { key: "Investment Interest", value: pref.investment_interest || "N/A" },
        { key: "Investment Horizon", value: pref.investment_horizon || "N/A" },
        { key: "Frequency", value: pref.frequency || "N/A" },
    ] : []

    console.log('final pref data 2222:', AllPrefData);

    return (
        <>
            {/* Background Overlay with Blur */}
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                {/* Centered Box */}
                <div className=" text-white p-6 rounded-lg shadow-lg">
                    <Card className="h-full w-full">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="mb-8 flex items-center justify-between gap-8">
                                <div>
                                    <Typography variant="h5" color="blue-gray">
                                        Edit Preferences
                                    </Typography>
                                    <Typography color="gray" className="mt-1 font-normal">
                                        See information about you current preference
                                    </Typography>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className=" px-0">
                            <table className="mt-4 w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head, index) => (
                                            <th
                                                key={head}
                                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                                >
                                                    {head}{" "}
                                                    {index !== TABLE_HEAD.length - 1 && (
                                                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                                    )}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pref.entries(({ img, name, email, job, org, online, date }, index) => {
                                        const isLast = index === TABLE_ROWZ.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={name}>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {job}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {org}
                                                        </Typography>
                                                    </div>
                                                </td>

                                                <td className={classes}>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {date}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Tooltip content="Edit User">
                                                        <IconButton variant="text">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                            
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardBody>
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        {/* <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography> */}
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Edit
          </Button>
        
        </div>
      </CardFooter>                    </Card>
                </div>
            </div>
        </>
    );
};
