<template>
    <div class="row align-items-center justify-content-center">
        <section class="col-md-4 col-sm-6 my-shadow rounded p-3 bg-white">
            <div class="form-block mx-auto">
                <div class="text-center mb-5">
                    <h3>Đặt lại mật khẩu</h3>
                </div>
                <form @submit.prevent="" class="text-start d-flex flex-column">
                    <section class="form-group first mb-3">
                        <label for="email">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="your-email@gmail.com"
                            id="email"
                            disabled
                        />
                    </section>
                    <section class="form-group d-flex flex-column last">
                        <div class="d-flex">
                            <label for="password">
                                Mật khẩu mới<span class="text-danger">*</span>
                            </label>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Nhập mật khẩu của bạn" id="password"/>
                            <span class="input-group-text" id="basic-addon1">@</span>
                        </div>
                    </section>
                    <section class="form-group d-flex flex-column last mb-2">
                        <div class="d-flex">
                            <label for="again-password">
                                Nhập lại mật khẩu<span class="text-danger">*</span>
                            </label>
                        </div>
                        <div class="input-group mb-3">
                            <input type="again-password" class="form-control" placeholder="Nhập lại mật khẩu của bạn" id="password"/>
                            <span class="input-group-text" id="basic-addon1">@</span>
                        </div>
                    </section>

                    <button class="btn btn-block py-2 btn-primary flex-fill">
                        Xác nhận đổi mật khẩu
                    </button>
                    <div class="d-flex justify-content-center mt-4 mb-2">
                        <span class="me-1">Quay lại</span>
                        <a href="#" class="text-primary fw-bold">đăng nhập</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>