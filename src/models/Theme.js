export class Theme {
  constructor({ id, name, description, image, status, user_choices, created_at, updated_at }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.status = status;
    this.userChoices = user_choices;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}