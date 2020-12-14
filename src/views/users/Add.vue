<template>
	<v-row>
		<v-row justify="center">
			<v-dialog v-model="openDialogAdd" persistent max-width="600">
				<v-card>
					<h1
						v-if="isActiveAddUser"
						class="headline font-weight-bold text-center text-uppercase display-1 blue--text text--darken-3 pb-4 pt-8"
					>
						Thêm user
					</h1>
					<h1
						class="headline font-weight-bold text-center text-uppercase display-1 blue--text text--darken-3 pb-4 pt-8"
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
								v-model.trim="$v.user.userName.$model"
								:class="{ 'is-invalid': validationStatus($v.user.userName) }"
								@input="$v.user.userName.$touch()"
								placeholder="User Name"
							>
							</v-text-field>
							<p class="text-left pl-8" v-if="!$v.user.userName.required">
								user name không được trống !
							</p>
							<p class="text-left pl-8" v-if="!$v.user.userName.minLength">
								user phải có nhiều hơn
								{{ $v.user.userName.$params.minLength.min }} kí tự!
							</p>
							<p class="text-left pl-8" v-if="!$v.user.userName.maxLength">
								user phải có nhiều hơn
								{{ $v.user.userName.$params.maxLength.max }} kí tự!
							</p>
							<v-text-field
								name="name"
								type="text"
								class="px-2"
								v-model.trim="$v.user.name.$model"
								:class="{ 'is-invalid': validationStatus($v.user.name) }"
								placeholder="Name"
							></v-text-field>
							<p class="text-left pl-8" v-if="!$v.user.name.required">
								name không được trống !
							</p>
							<p class="text-left pl-8" v-if="!$v.user.name.minLength">
								phải có nhiều hơn
								{{ $v.user.name.$params.minLength.min }} kí tự!
							</p>
							<p class="text-left pl-8" v-if="!$v.user.name.maxLength">
								phải có nhiều hơn
								{{ $v.user.name.$params.maxLength.max }} kí tự!
							</p>
							<v-text-field
								name="age"
								type="number"
								class="px-2"
								v-model.trim="$v.user.age.$model"
								:class="{ 'is-invalid': validationStatus($v.user.age) }"
								placeholder="Age"
							>
								<p class="text-left pl-8" v-if="!$v.user.age.between">
									tuổi phải lơn hơn {{ $v.user.age.$params.between.min }} và nhỏ
									hơn {{ $v.user.age.$params.between.max }} !
								</p>
							</v-text-field>

							<div class="d-flex align-end justify-start px-2 pr-6 ">
								<span
									class="red--text text--darken-1 rounded-pill mr-12"
									style="border:1px solid gray;"
									><v-icon>mdi-account mdi-36px</v-icon></span
								>
								<v-file-input
									hide-input
									v-model="file"
									filled
									persistent-hint
									prepend-icon="mdi-upload mdi-36px"
									@change="imageAvatar"
								>
								</v-file-input>
								<p class="text-left pl-8" v-if="!$v.user.avatar.required">
									Hãy upload avatar !
								</p>
							</div></v-form
						></v-card-text
					>
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
			userName: { required, minLength: minLength(6), maxLength: maxLength(20) },
			name: {
				required,
				minLength: minLength(5),
				maxLength: maxLength(20),
			},
			avatar: { required },
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
			// this.closeDialogAdd();
			this.$v.$touch();
			if (this.$v.user.$pending || this.$v.user.$error) return;
			this.loadingSave = true;
			setTimeout(() => {
				this.loadingSave = false;
				this.$emit("closeDialogAdd");
				if (this.file != null) {
					this.user.avatar = this.file.name;
				}

				if (
					this.user.userName != "" &&
					this.user.name != "" &&
					this.user.age > 1 &&
					this.user.avatar != ""
				) {
					this.$emit("saveUser", {
						action: this.isActiveAddUser,
						user: this.user,
					});
				} else {
					console.log("err");
				}
			}, 1000);
		},
		closeDialogAdd() {
			this.$emit("closeDialogAdd");
		},
	},
	computed: {
		openDialogAdd() {
			return this.isOpenDialogAdd;
		},
	},
	mounted() {
		// this.$v.user.$touch();
	},
};
</script>

<style scoped></style>
