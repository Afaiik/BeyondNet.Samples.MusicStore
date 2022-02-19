class SongDomainException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default SongDomainException;
