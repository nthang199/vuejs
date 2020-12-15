<template>
	<v-row>
		<v-row justify="center">
			<v-dialog v-model="openDialogAdd" persistent max-width="600">
				<v-card>
					<h1
						v-if="isActiveAddUser"
						class="headline font-weight-bold text-center text-uppercase text-h6 text-sm-h5 text-md-h4 blue--text text--darken-3 pb-4 pt-8"
					>
						Thêm user
					</h1>
					<h1
						class="headline font-weight-bold text-center text-uppercase text-h6 text-sm-h5 text-md-h4 blue--text text--darken-3 pb-4 pt-8"
						v-else
					>
						Sửa thông tin
					</h1>
					<v-card-text>
						<v-form class="pa-4 pb-6">
							<v-text-field
								name="username"
								type="text"
								class="px-2"
								@input="$v.user.userName.$touch()"
								v-model="user.userName"
								:errorMessages="userNameError"
								placeholder="userName"
							>
							</v-text-field>
							<v-text-field
								name="name"
								type="text"
								class="px-2"
								@input="$v.user.name.$touch()"
								v-model="user.name"
								:errorMessages="nameError"
								placeholder="Name"
							></v-text-field>
							<v-text-field
								name="age"
								type="number"
								class="px-2"
								@input="$v.user.age.$touch()"
								v-model.trim="user.age"
								:errorMessages="ageError"
								placeholder="Age"
							>
							</v-text-field>
							<div class="d-flex align-end justify-start px-2 pr-6 ">
								<v-file-input
									v-model="file"
									filled
									accept="image/png, image/jpeg, image/bmp"
									placeholder="Avatar"
									persistent-hint
									prepend-icon="mdi-upload mdi-36px"
									@change="imageAvatar"
								>
								</v-file-input></div></v-form
					></v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-3 " text @click="closeDialogAdd">
							Cancel
						</v-btn>
						<v-btn
							color="blue darken-3"
							:loading="loadingSave"
							:disabled="loadingSave"
							text
							@click="saveUser"
						>
							Save
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</v-row>
</template>

<script>
import {
	required,
	minLength,
	maxLength,
	between,
} from "vuelidate/lib/validators";
export default {
	name: "user-add",
	validations: {
		user: {
			name: {
				required,
				minLength: minLength(5),
				maxLength: maxLength(10),
			},
			userName: { required, minLength: minLength(6), maxLength: maxLength(10) },
			age: { between: between(10, 100) },
		},
	},
	props: {
		user: { type: Object, default: null },
		isOpenDialogAdd: Boolean,
		isActiveAddUser: Boolean,
	},
	data() {
		return {
			file: null,
			loadingSave: false,
		};
	},
	methods: {
		validationStatus(validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},
		imageAvatar() {
			this.user.avatar = this.file.name;
		},
		saveUser() {
			if (this.$v.user.$pending || this.$v.user.$error) return;
			this.loadingSave = true;
			setTimeout(() => {
				this.loadingSave = false;
				this.$emit("closeDialogAdd");
				if (
					this.user.userName != "" &&
					this.user.name != "" &&
					this.user.age > 9 &&
					this.user.avatar != ""
				) {
					this.$emit("saveUser", {
						action: this.isActiveAddUser,
						user: this.user,
					});
				} else {
					console.log("err");
				}
			}, 500);
			this.file = null;
		},
		closeDialogAdd() {
			this.$emit("closeDialogAdd");
		},
	},
	computed: {
		openDialogAdd() {
			return this.isOpenDialogAdd;
		},
		userNameError() {
			let errors = [];
			if (!this.$v.user.userName.$dirty) {
				return errors;
			}
			!this.$v.user.userName.required &&
				errors.push("UserName không được bỏ trống !");
			!this.$v.user.userName.maxLength &&
				errors.push(
					`UserName phải nhỏ hơn ` +
						this.$v.user.userName.$params.maxLength.max +
						` kí tự`
				);
			!this.$v.user.userName.minLength &&
				errors.push(
					`UserName phải lớn hơn ` +
						this.$v.user.userName.$params.minLength.min +
						` kí tự`
				);
			return errors;
		},
		nameError() {
			let errors = [];
			if (!this.$v.user.name.$dirty) {
				return errors;
			}
			!this.$v.user.name.required && errors.push("Name không được bỏ trống !");
			!this.$v.user.name.maxLength &&
				errors.push(
					`Name phải nhỏ hơn ` +
						this.$v.user.name.$params.maxLength.max +
						` kí tự`
				);
			!this.$v.user.name.minLength &&
				errors.push(
					`Name phải lớn hơn ` +
						this.$v.user.name.$params.minLength.min +
						` kí tự`
				);
			return errors;
		},
		ageError() {
			let errors = [];
			if (!this.$v.user.age.$dirty) {
				return errors;
			}
			!this.$v.user.age.between &&
				errors.push(
					`Tuổi phải từ  ` +
						this.$v.user.age.$params.between.min +
						` đến ` +
						this.$v.user.age.$params.between.max +
						` !`
				);
			return errors;
		},
	},
	mounted() {},
};
</script>

<style scoped></style>
