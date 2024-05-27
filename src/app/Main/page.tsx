"use client";
import Table from "@/components/table";
import { dataUser } from "@/data_services/dataFormUser";
import React, { useEffect, useState } from "react";

const genderOptions = ["Male", "Female", "Unknown"];

const AddInformationForm: React.FC = () => {
	//เก็บข้อมูลของ Form
	const [formData, setFormData] = useState<dataUser>({
		id: 1,
		firstname: "",
		lastname: "",
		gender: "",
		score: 0,
	});

	//เก็บข้อมูลของผู้ใช้งาน
	const [data, setData] = useState<dataUser[]>([]);

	//เก็บข้อความ Errors ต่างๆ
	const [errors, setErrors] = useState<Partial<dataUser>>({});

	//ใช้อัพเดต Form เมื่อมีการเปลี่ยนเเปลง
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "score" ? parseFloat(value) : value,
		});
	};

	//เอาไว้ตรวจสอบข้อผิดผลาด เเละ เก็ยไว้ในnewErrorsเเล้วนำไปเเสดง
	//ถ้าไม่มีข้อผิดผลาดจะอัพเดตไปยัง data
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors: Partial<dataUser> = {};
		Object.keys(formData).forEach((key) => {
			if (!formData[key as keyof dataUser] && formData[key as keyof dataUser] !== 0) {
				newErrors[key as keyof dataUser] = `${key} is required`;
			}
		});
		const score = parseFloat(formData.score.toString());
		if (isNaN(score)) {
			newErrors.score = "Score must be a number";
		} else if (score < 0) {
			newErrors.score = "Minimum is 0";
		} else if (score > 100) {
			newErrors.score = "Maximum is 100";
		}
		setErrors(newErrors);
		if (Object.keys(newErrors).length === 0) {
			const newData = { ...formData };
			setData([...data, newData]);
			setFormData({
				id: formData.id + 1,
				firstname: "",
				lastname: "",
				gender: "",
				score: 0,
			});
		}
	};

	//รีเซต Form ที่กรอกเมื่อกดยกเลิก
	const handleCancel = () => {
		setFormData({
			id: formData.id + 1,
			firstname: "",
			lastname: "",
			gender: "",
			score: 0,
		});
	};

	//กำหนดค่าเริ่มต้นของ data
	useEffect(() => {
		setData(dataUser);
	}, []);

	return (
		<main className="bg-blue-200">
			<form onSubmit={handleSubmit} className="max-w-sm mx-auto">
				<div className="mb-4">
					<label htmlFor="firstName" className="block">
						First Name:
					</label>
					<input
						type="text"
						id="firstName"
						name="firstname"
						value={formData.firstname}
						onChange={handleChange}
						className="border rounded-md px-3 py-2 w-full"
					/>
					{errors.firstname && <span className="text-red-500">{errors.firstname}</span>}
				</div>
				<div className="mb-4">
					<label htmlFor="lastName" className="block">
						Last Name:
					</label>
					<input
						type="text"
						id="lastName"
						name="lastname"
						value={formData.lastname}
						onChange={handleChange}
						className="border rounded-md px-3 py-2 w-full"
					/>
					{errors.lastname && <span className="text-red-500">{errors.lastname}</span>}
				</div>
				<div className="mb-4">
					<label htmlFor="gender" className="block">
						Gender:
					</label>
					<select
						id="gender"
						name="gender"
						value={formData.gender}
						onChange={handleChange}
						className="border rounded-md px-3 py-2 w-full"
					>
						<option value="">Select Gender</option>
						{genderOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
					{errors.gender && <span className="text-red-500">{errors.gender}</span>}
				</div>
				<div className="mb-4">
					<label htmlFor="score" className="block">
						Score:
					</label>
					<input
						type="number"
						id="score"
						name="score"
						value={formData.score}
						onChange={handleChange}
						className="border rounded-md px-3 py-2 w-full"
					/>
					{errors.score && <span className="text-red-500">{errors.score}</span>}
				</div>
				<div className="flex justify-between">
					<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
						ADD
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
					>
						Cancel
					</button>
				</div>
			</form>
			<hr className="my-8" />
			<div>
				<Table datainfo={data} />
			</div>
		</main>
	);
};

export default AddInformationForm;
