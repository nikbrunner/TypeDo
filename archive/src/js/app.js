init();

inputForm.addEventListener('submit', e => {
  const command = {
    input: input.value,
    extractCMD: function() {
      return this.input.substring(
        this.CMDIndexStart(),
        this.CMDIndexEnd()
      );
    },
    CMDIndexStart: function() {
      return this.input.indexOf('-');
    },
    CMDIndexEnd: function() {
      return this.CMDIndexStart() + 3;
    },
    extractList: function() {
      return `db.${this.input
        .substring(0, this.CMDIndexStart() - 1)
        .toLowerCase()}`;
    },
    extractTitle: function() {
      return this.input
        .substring(this.CMDIndexEnd() + 1, this.input.length)
        .toLowerCase();
    },
  };

  if (command.extractCMD() === commands.todo) {
    createItem(
      command.extractList(),
      command.extractCMD(),
      command.extractTitle(),
      e
    );
  } else if (command.input === commands.console.clearAllDone) {
    refreshAll();
    clearInput();
  } else if (
    command.input === commands.console.clearAllOutputs
  ) {
    clearAllOutputs();
  }

  e.preventDefault();
});
