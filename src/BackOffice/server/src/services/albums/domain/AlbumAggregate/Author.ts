import { ValueObject } from '../../../shared/domain';

export type AuthorProps = {
  AuthorId: string;
  Name: string;
  UserName: string;
};

class Author extends ValueObject<AuthorProps> {
  private _authorId: string;
  private _name: string;
  private _userName: string;

  public get authorId(): string {
    return this._authorId;
  }

  public get Name(): string {
    return this._name;
  }

  public get UserName(): string {
    return this._userName;
  }

  private constructor(props: AuthorProps) {
    super(props);

    this._authorId = props.AuthorId;
    this._name = props.Name;
    this._userName = props.UserName;
  }

  public static Create(
    AuthorId: string,
    Name: string,
    UserName: string
  ): Author {
    return new Author({ AuthorId, Name, UserName });
  }
}

export default Author;
