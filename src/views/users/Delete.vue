<template>
	<v-row>
		<v-row justify="center">
			<v-dialog v-model="openDialogDelete" persistent max-width="600">
				<v-card>
					<v-card-title class="heading red--text text--darken-1 text-uppercase">
						Delete user
					</v-card-title>
					<v-card-text class="text-body-2 grey--text text--darken-3"
						>Bạn có chắc chắn muốn xoá người dùng
						<strong class="">{{ user.userName }}</strong> không ?</v-card-text
					>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-3" text @click="closeDialogDelete">
							Cancel
						</v-btn>
						<v-btn
							color="blue darken-3"
							text
							@click="deleteUser"
							:loading="loadingDelete"
							:disabled="loadingDelete"
						>
							Delete
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</v-row>
</template>

<script>
export default {
	name: "user-delete",
	props: {
		user: { type: Object, default: null },
		isOpenDialogDelete: Boolean,
	},
	data() {
		return {
			loadingDelete: false,
		};
	},
	methods: {
		deleteUser() {
			this.loadingDelete = true;
			setTimeout(() => {
				this.loadingDelete = false;
				this.$emit("closeDialogDelete");
				this.closeDialogDelete();
				this.$emit("deleteUser", this.user.id);
			}, 500);
		},
		closeDialogDelete() {
			this.$emit("closeDialogDelete");
		},
	},
	computed: {
		openDialogDelete() {
			return this.isOpenDialogDelete;
		},
	},
};
</script>

<style></style>
