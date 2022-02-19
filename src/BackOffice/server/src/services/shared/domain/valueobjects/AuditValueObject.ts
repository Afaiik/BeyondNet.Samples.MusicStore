import { ValueObject } from './ValueObject';

export type AuditProps = {
  CreatedOn: Date;
  CreatedBy: string;
  UpdatedOn?: Date | null;
  UpdatedBy?: string | null;
  Timestamp: number;
};

export class AuditValueObject extends ValueObject<AuditProps> {
  private _createdOn: Date;
  private _createdBy: string;
  private _updatedOn: Date | null;
  private _updatedBy: string | null;
  private _timestamp: number;

  CreatedOn(): Date {
    return this._createdOn;
  }

  CreatedBy(): string {
    return this._createdBy;
  }

  UpdateOn(): Date | null {
    return this._updatedOn ?? null;
  }

  UpdatedBy(): string {
    return this._updatedBy ?? '';
  }

  private constructor(props: AuditProps) {
    super(props);

    this._createdOn = props.CreatedOn;
    this._createdBy = props.CreatedBy;
    this._updatedOn = props.UpdatedOn ?? null;
    this._updatedBy = props.UpdatedBy ?? null;
    this._timestamp = props.Timestamp;
  }

  public static Create(createdBy: string): Audit {
    const props: AuditProps = {
      CreatedOn: new Date(),
      CreatedBy: createdBy,
      UpdatedOn: null,
      UpdatedBy: '',
      Timestamp: +new Date()
    };

    return new Audit({ ...props });
  }

  public Update(updatedBy: string): Audit {
    this._updatedBy = updatedBy;
    this._updatedOn = new Date();
    this._timestamp = +new Date();

    return this;
  }
}
