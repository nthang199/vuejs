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
								v-model="user.userName"
								placeholder="User Name"
							>
							</v-text-field>
							<v-text-field
								name="name"
								type="text"
								class="px-2"
								v-model="user.name"
								placeholder="Name"
							></v-text-field>

							<v-text-field
								name="age"
								type="text"
								class="px-2"
								v-model="user.age"
								placeholder="Age"
							>
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
									placeholder="Age"
									@change="imageAvatar"
								>
								</v-file-input></div></v-form
					></v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-3 " text @click="closeDialogAdd">
							Cancel
						</v-btn>
						<v-btn color="blue darken-3" text @click="saveUser">
							Save
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</v-row>
</template>

<script>
export default {
	name: "user-add",
	props: {
		user: { type: Object, default: null },
		isOpenDialogAdd: Boolean,
		isActiveAddUser: Boolean,
	},
	data() {
		return {
			file: null,
			dialog: false,
		};
	},
	methods: {
		imageAvatar() {
			console.log(this.file.name);
		},
		saveUser() {
			this.closeDialogAdd();
			if (this.file != null) {
				this.user.avatar = this.file.name;
			}
			if (
				this.user.userName != "" &&
				this.user.name != "" &&
				this.user.age > 0 &&
				this.user.avatar != ""
			) {
				this.$emit("saveUser", {
					action: this.isActiveAddUser,
					user: this.user,
				});
			}
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
};
</script>

<style scoped></style>
