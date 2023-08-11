function Validation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!values.last_name) {
        errors.last_name = "Овогоо оруулна уу.";
    }

    if (!values.first_name) {
        errors.first_name = "Нэрээ оруулна уу.";
    }

    if (!values.email) {
        errors.email = "И-мэйл хаягаа оруулна уу.";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "И-мэйл хаяг буруу байна";
    }

    if (!values.age) {
        errors.age = "Насаа оруулна уу.";
    }

    if (!values.sex) {
        errors.sex = "Хүйсээ оруулна уу.";
    }

    if (!values.ID_number) {
        errors.ID_number = "Регистрийн дугаараа оруулна уу.";
    }

    if (!values.location) {
        errors.location = "Байршилаа оруулна уу.";
    }

    if (!values.profession) {
        errors.profession = "Хоосон байж болохгүй.";
    }

    if (!values.experience) {
        errors.experience = "Хоосон байж болохгүй";
    }

    if (!values.skills) {
        errors.skills = "Хоосон байж болохгүй";
    }

    if (!values._password) {
        errors._password = "Хоосон байж болохгүй";
    } else if (!passwordPattern.test(values._password)) {
        errors._password =
            "Нууц үг хамгийн багадаа нэг том, нэг жижиг үсэг, нэг тоо, нэг тусгай тэмдэгт агуулсан байх ёстой. 8 тэмдэгтийн урттай байх ёстой.";
    }

    return errors;
}

export default Validation;