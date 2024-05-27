"use client";
import { dataUser } from "@/data_services/dataFormUser";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

type Props = {
	datainfo: dataUser[];
	onEdit: (user: dataUser) => void;
};

const Table: React.FC<Props> = ({ datainfo, onEdit }) => {
	const getGenderAbbreviation = (gender: string) => {
		switch (gender) {
			case "Male":
				return "M";
			case "Female":
				return "F";
			case "Unknown":
				return "U";
			default:
				return "";
		}
	};

	return (
		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-blue-500">
				<tr>
					<th
						scope="col"
						className="px-6 py-3 text-left text-x font-medium text-gray-100 uppercase tracking-wider"
					>
						No
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
					>
						Edit
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
					>
						First Name
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
					>
						Last Name
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
					>
						Gender
					</th>
					<th
						scope="col"
						className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
					>
						Score
					</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{datainfo.map((row, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<tr key={index}>
						<td className="px-6 py-4 whitespace-nowrap text-base text-black">
							{index + 1}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-base text-black">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={() => onEdit(row)}
								className="text-blue-600 hover:text-blue-900"
							>
								<FaPencilAlt className="font-bold" />
							</button>
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-base text-black">
							{row.firstname}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-base text-black">
							{row.lastname}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-base text-black">
							{row.gender}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-base text-black">
							{row.score}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
