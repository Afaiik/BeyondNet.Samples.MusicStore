import { ValueObject } from '../../../shared/domain';

export type FileProps = {
  name: string;
  path: string;
};

class FileReference extends ValueObject<FileProps> {
  private _name: string;
  private _path: string;

  public get name(): string {
    return this._name;
  }

  public get path(): string {
    return this._path;
  }

  constructor(props: FileProps) {
    super(props);

    this._name = props.name;
    this._path = props.path;
  }

  public static Create(name: string, path: string): FileReference {
    return new FileReference({ name, path });
  }
}

export default FileReference;
