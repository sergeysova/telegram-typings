const { BaseBuilder } = require('./base')
/*:: const { Union, Field } = require('../store')*/


class AbstractJsBuilder extends BaseBuilder {
  buildFloat() {
    return this.buildInteger()
  }

  buildCommentBlock(lines/*: string[]*/) {
    return [{
      type: 'CommentBlock',
      value: `*\n${lines.filter((e) => !!e).map((line) => ` * ${line}`).join('\n')}\n `,
    }]
  }

  buildCommentSeeLink(link/*: string*/) {
    return `@see ${link}`
  }
}

module.exports = {
  AbstractJsBuilder,
}

