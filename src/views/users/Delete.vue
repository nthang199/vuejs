<template>
	<v-row>
		<v-row justify="center">
			<v-dialog v-model="dialog" persistent max-width="600">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class=""
						fab
						dark
						x-small
						elevation="12"
						color="#E53935"
						v-bind="attrs"
						v-on="on"
					>
						<v-icon dark>
							mdi-delete
						</v-icon>
					</v-btn>
				</template>
				<v-card>
					<v-card-title class="heading red--text text--darken-1 text-uppercase">
						Delete user
					</v-card-title>
					<v-card-text class="text-body-2 grey--text text--darken-3"
						>Bạn có chắc chắn muốn xoá người dùng {{ user.userName }} không
						?</v-card-text
					>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-3" text @click="dialog = false">
							Cancel
						</v-btn>
						<v-btn color="blue darken-3" text @click="deleteUser">
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
	},
	data() {
		return {
			dialog: false,
		};
	},
	methods: {
		deleteUser() {
			this.$emit("deleteUser", this.user.id);
			this.dialog = false;
		},
	},
};
</script>

<style></style>
